<?php
/**
 * Leadtop inquiry storage, REST API and WordPress admin screens.
 *
 * @package Leadtop_Inquiries
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Leadtop_Inquiries {
	const POST_TYPE   = 'leadtop_inquiry';
	const API_ROLE    = 'leadtop_inquiry_api';
	const OPTION_KEY  = 'leadtop_inquiries_options';
	const REST_NS     = 'leadtop/v1';
	const REST_ROUTE  = '/inquiries';

	/** @var Leadtop_Inquiries|null */
	private static $instance = null;

	/**
	 * Stored fields and their admin labels.
	 *
	 * @var array<string,string>
	 */
	private $field_labels = array(
		'name'          => '姓名',
		'phone'         => '电话',
		'wechat'        => '微信 / QQ',
		'email'         => '邮箱',
		'company'       => '公司名称',
		'contact'       => '联系方式',
		'website'       => '官网 / 店铺链接',
		'product'       => '公司主营产品',
		'business_type' => '业务类型',
		'problem'       => '当前问题',
		'needs'         => '其他需求',
		'form_type'     => '表单类型',
		'source_page'   => '来源页面',
		'landing_url'   => '落地页',
		'referrer'      => '引荐页面',
		'utm_source'    => 'UTM Source',
		'utm_medium'    => 'UTM Medium',
		'utm_campaign'  => 'UTM Campaign',
		'utm_term'      => 'UTM Term',
		'utm_content'   => 'UTM Content',
	);

	/**
	 * Get the singleton instance.
	 *
	 * @return Leadtop_Inquiries
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post_' . self::POST_TYPE, array( $this, 'save_admin_fields' ) );
		add_action( 'save_post_post', array( $this, 'notify_content_change' ), 20, 3 );
		add_action( 'before_delete_post', array( $this, 'notify_content_deletion' ), 10, 2 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_action( 'admin_menu', array( $this, 'register_settings_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_post_leadtop_export_inquiries', array( $this, 'export_csv' ) );
		add_action( 'restrict_manage_posts', array( $this, 'render_status_filter' ) );
		add_action( 'pre_get_posts', array( $this, 'apply_status_filter' ) );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'render_admin_column' ), 10, 2 );
		add_filter( 'bulk_actions-edit-' . self::POST_TYPE, array( $this, 'register_bulk_actions' ) );
		add_filter( 'handle_bulk_actions-edit-' . self::POST_TYPE, array( $this, 'handle_bulk_actions' ), 10, 3 );
		add_action( 'admin_notices', array( $this, 'bulk_action_notice' ) );
		add_filter( 'post_row_actions', array( $this, 'remove_quick_edit' ), 10, 2 );
	}

	/**
	 * Add capabilities and the restricted API user role.
	 *
	 * @return void
	 */
	public static function activate() {
		$admin = get_role( 'administrator' );
		if ( $admin ) {
			foreach ( self::manager_capabilities() as $capability ) {
				$admin->add_cap( $capability );
			}
		}

		add_role(
			self::API_ROLE,
			'Leadtop 询盘接口',
			array(
				'read'                     => true,
				'create_leadtop_inquiries' => true,
			)
		);
		$api_role = get_role( self::API_ROLE );
		if ( $api_role ) {
			$api_role->add_cap( 'read' );
			$api_role->add_cap( 'create_leadtop_inquiries' );
		}

		self::instance()->register_post_type();
		flush_rewrite_rules();
	}

	/**
	 * Flush routes without deleting stored inquiries or roles.
	 *
	 * @return void
	 */
	public static function deactivate() {
		flush_rewrite_rules();
	}

	/**
	 * Capabilities granted to administrators.
	 *
	 * @return string[]
	 */
	private static function manager_capabilities() {
		return array(
			'create_leadtop_inquiries',
			'edit_leadtop_inquiry',
			'read_leadtop_inquiry',
			'delete_leadtop_inquiry',
			'edit_leadtop_inquiries',
			'edit_others_leadtop_inquiries',
			'publish_leadtop_inquiries',
			'read_private_leadtop_inquiries',
			'delete_leadtop_inquiries',
			'delete_private_leadtop_inquiries',
			'delete_published_leadtop_inquiries',
			'delete_others_leadtop_inquiries',
			'edit_private_leadtop_inquiries',
			'edit_published_leadtop_inquiries',
			'manage_leadtop_inquiries',
		);
	}

	/**
	 * Register a private post type. No public REST controller is exposed.
	 *
	 * @return void
	 */
	public function register_post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels' => array(
					'name'               => '询盘管理',
					'singular_name'      => '询盘',
					'menu_name'          => '询盘管理',
					'all_items'          => '全部询盘',
					'add_new'            => '手动添加',
					'add_new_item'       => '添加询盘',
					'edit_item'          => '查看 / 编辑询盘',
					'new_item'           => '新询盘',
					'view_item'          => '查看询盘',
					'search_items'       => '搜索询盘',
					'not_found'          => '暂无询盘',
					'not_found_in_trash' => '回收站中没有询盘',
				),
				'public'              => false,
				'publicly_queryable'  => false,
				'exclude_from_search' => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_rest'        => false,
				'menu_icon'           => 'dashicons-businessperson',
				'menu_position'       => 25,
				'supports'            => array( 'title' ),
				'capability_type'     => array( 'leadtop_inquiry', 'leadtop_inquiries' ),
				'map_meta_cap'        => true,
				'capabilities'        => array( 'create_posts' => 'do_not_allow' ),
			)
		);
	}

	/**
	 * Register the authenticated server-to-server endpoint.
	 *
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route(
			self::REST_NS,
			self::REST_ROUTE,
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'create_inquiry' ),
				'permission_callback' => function () {
					return current_user_can( 'create_leadtop_inquiries' );
				},
				'args'                => $this->rest_args(),
			)
		);
	}

	/**
	 * REST argument rules shared by all current website forms.
	 *
	 * @return array<string,array<string,mixed>>
	 */
	private function rest_args() {
		$text = function ( $value ) {
			return sanitize_text_field( (string) $value );
		};

		$args = array();
		foreach ( array( 'name', 'phone', 'wechat', 'company', 'contact', 'product', 'business_type', 'form_type', 'source_page', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content' ) as $field ) {
			$args[ $field ] = array(
				'type'              => 'string',
				'required'          => false,
				'maxLength'         => 250,
				'sanitize_callback' => $text,
			);
		}

		// Accept the exact camelCase/legacy names currently used by React forms.
		$args['businessType'] = $args['business_type'];
		$args['site']         = array(
			'type'              => 'string',
			'required'          => false,
			'maxLength'         => 2048,
			'sanitize_callback' => 'esc_url_raw',
			'validate_callback' => function ( $value ) {
				return '' === $value || (bool) wp_http_validate_url( $value );
			},
		);

		$args['email'] = array(
			'type'              => 'string',
			'required'          => false,
			'maxLength'         => 254,
			'sanitize_callback' => 'sanitize_email',
			'validate_callback' => function ( $value ) {
				return '' === $value || is_email( $value );
			},
		);

		foreach ( array( 'website', 'landing_url', 'referrer' ) as $field ) {
			$args[ $field ] = array(
				'type'              => 'string',
				'required'          => false,
				'maxLength'         => 2048,
				'sanitize_callback' => 'esc_url_raw',
				'validate_callback' => function ( $value ) {
					return '' === $value || (bool) wp_http_validate_url( $value );
				},
			);
		}

		foreach ( array( 'problem', 'needs' ) as $field ) {
			$args[ $field ] = array(
				'type'              => 'string',
				'required'          => false,
				'maxLength'         => 5000,
				'sanitize_callback' => 'sanitize_textarea_field',
			);
		}

		$args['consent'] = array(
			'type'              => 'boolean',
			'required'          => false,
			'sanitize_callback' => 'rest_sanitize_boolean',
		);

		return $args;
	}

	/**
	 * Store one submission.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create_inquiry( WP_REST_Request $request ) {
		$data = array();
		foreach ( array_keys( $this->field_labels ) as $field ) {
			$value = $request->get_param( $field );
			if ( null !== $value && '' !== $value ) {
				$data[ $field ] = $value;
			}
		}
		if ( empty( $data['business_type'] ) && $request->get_param( 'businessType' ) ) {
			$data['business_type'] = $request->get_param( 'businessType' );
		}
		if ( empty( $data['website'] ) && $request->get_param( 'site' ) ) {
			$data['website'] = $request->get_param( 'site' );
		}

		if ( empty( $data['name'] ) || ( empty( $data['contact'] ) && empty( $data['phone'] ) && empty( $data['email'] ) ) ) {
			return new WP_Error(
				'leadtop_missing_contact',
				'请至少提供姓名和一种联系方式。',
				array( 'status' => 400 )
			);
		}

		$title_parts = array_filter(
			array(
				isset( $data['name'] ) ? $data['name'] : '',
				isset( $data['company'] ) ? $data['company'] : '',
			)
		);

		$post_id = wp_insert_post(
			array(
				'post_type'   => self::POST_TYPE,
				'post_status' => 'private',
				'post_title'  => implode( ' · ', $title_parts ),
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			return new WP_Error(
				'leadtop_insert_failed',
				'询盘暂时无法保存，请稍后重试。',
				array( 'status' => 500 )
			);
		}

		foreach ( $data as $field => $value ) {
			update_post_meta( $post_id, '_leadtop_' . $field, $value );
		}
		update_post_meta( $post_id, '_leadtop_status', 'new' );
		update_post_meta( $post_id, '_leadtop_consent', $request->get_param( 'consent' ) ? '1' : '0' );

		$this->send_notification( $post_id, $data );

		return new WP_REST_Response(
			array(
				'success'      => true,
				'inquiry_id'   => (int) $post_id,
				'submitted_at' => get_post_time( DATE_ATOM, true, $post_id ),
				'message'      => '提交成功，我们会尽快与您联系。',
			),
			201
		);
	}

	/**
	 * Add inquiry detail and follow-up panels.
	 *
	 * @return void
	 */
	public function add_meta_boxes() {
		add_meta_box( 'leadtop-inquiry-details', '询盘内容', array( $this, 'render_details_box' ), self::POST_TYPE, 'normal', 'high' );
		add_meta_box( 'leadtop-inquiry-followup', '跟进信息', array( $this, 'render_followup_box' ), self::POST_TYPE, 'side', 'high' );
	}

	/**
	 * Render all submitted fields.
	 *
	 * @param WP_Post $post Current inquiry.
	 * @return void
	 */
	public function render_details_box( $post ) {
		echo '<div class="leadtop-inquiry-grid">';
		foreach ( $this->field_labels as $field => $label ) {
			$value = get_post_meta( $post->ID, '_leadtop_' . $field, true );
			if ( '' === $value ) {
				continue;
			}

			$wide = in_array( $field, array( 'problem', 'needs', 'landing_url', 'referrer' ), true ) ? ' is-wide' : '';
			echo '<div class="leadtop-inquiry-field' . esc_attr( $wide ) . '">';
			echo '<strong>' . esc_html( $label ) . '</strong>';
			if ( 'email' === $field ) {
				echo '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
			} elseif ( in_array( $field, array( 'website', 'landing_url', 'referrer' ), true ) ) {
				echo '<a href="' . esc_url( $value ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( $value ) . '</a>';
			} else {
				echo '<span>' . nl2br( esc_html( $value ) ) . '</span>';
			}
			echo '</div>';
		}
		echo '</div>';
	}

	/**
	 * Render editable status, owner and notes.
	 *
	 * @param WP_Post $post Current inquiry.
	 * @return void
	 */
	public function render_followup_box( $post ) {
		$status = get_post_meta( $post->ID, '_leadtop_status', true );
		$owner  = get_post_meta( $post->ID, '_leadtop_owner', true );
		$notes  = get_post_meta( $post->ID, '_leadtop_notes', true );
		wp_nonce_field( 'leadtop_save_inquiry', 'leadtop_inquiry_nonce' );
		?>
		<p>
			<label for="leadtop-status"><strong>处理状态</strong></label><br>
			<select class="widefat" id="leadtop-status" name="leadtop_status">
				<?php foreach ( $this->statuses() as $key => $label ) : ?>
					<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $status ?: 'new', $key ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
		</p>
		<p>
			<label for="leadtop-owner"><strong>负责人</strong></label><br>
			<input class="widefat" id="leadtop-owner" name="leadtop_owner" type="text" value="<?php echo esc_attr( $owner ); ?>">
		</p>
		<p>
			<label for="leadtop-notes"><strong>跟进备注</strong></label><br>
			<textarea class="widefat" id="leadtop-notes" name="leadtop_notes" rows="8"><?php echo esc_textarea( $notes ); ?></textarea>
		</p>
		<?php
	}

	/**
	 * Save only the admin-editable follow-up fields.
	 *
	 * @param int $post_id Inquiry ID.
	 * @return void
	 */
	public function save_admin_fields( $post_id ) {
		if ( ! isset( $_POST['leadtop_inquiry_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['leadtop_inquiry_nonce'] ) ), 'leadtop_save_inquiry' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_leadtop_inquiry', $post_id ) ) {
			return;
		}

		$status = isset( $_POST['leadtop_status'] ) ? sanitize_key( wp_unslash( $_POST['leadtop_status'] ) ) : 'new';
		if ( ! array_key_exists( $status, $this->statuses() ) ) {
			$status = 'new';
		}

		update_post_meta( $post_id, '_leadtop_status', $status );
		update_post_meta( $post_id, '_leadtop_owner', isset( $_POST['leadtop_owner'] ) ? sanitize_text_field( wp_unslash( $_POST['leadtop_owner'] ) ) : '' );
		update_post_meta( $post_id, '_leadtop_notes', isset( $_POST['leadtop_notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['leadtop_notes'] ) ) : '' );
	}

	/**
	 * Inquiry lifecycle labels.
	 *
	 * @return array<string,string>
	 */
	private function statuses() {
		return array(
			'new'       => '新询盘',
			'contacted' => '已联系',
			'qualified' => '有效商机',
			'won'       => '已成交',
			'closed'    => '已关闭',
			'spam'      => '垃圾询盘',
		);
	}

	/**
	 * Customize the list table.
	 *
	 * @return array<string,string>
	 */
	public function admin_columns() {
		return array(
			'cb'              => '<input type="checkbox" />',
			'title'           => '联系人 / 公司',
			'leadtop_contact' => '联系方式',
			'leadtop_form'    => '表单来源',
			'leadtop_status'  => '状态',
			'leadtop_owner'   => '负责人',
			'date'            => '提交时间',
		);
	}

	/**
	 * Render a list table cell.
	 *
	 * @param string $column  Column key.
	 * @param int    $post_id Inquiry ID.
	 * @return void
	 */
	public function render_admin_column( $column, $post_id ) {
		if ( 'leadtop_contact' === $column ) {
			$contact = get_post_meta( $post_id, '_leadtop_contact', true );
			$phone   = get_post_meta( $post_id, '_leadtop_phone', true );
			$email   = get_post_meta( $post_id, '_leadtop_email', true );
			echo esc_html( $contact ?: $phone ?: $email ?: '—' );
		} elseif ( 'leadtop_form' === $column ) {
			$form   = get_post_meta( $post_id, '_leadtop_form_type', true );
			$source = get_post_meta( $post_id, '_leadtop_source_page', true );
			echo esc_html( $form ?: $source ?: '—' );
		} elseif ( 'leadtop_status' === $column ) {
			$status   = get_post_meta( $post_id, '_leadtop_status', true ) ?: 'new';
			$statuses = $this->statuses();
			echo '<span class="leadtop-status status-' . esc_attr( $status ) . '">' . esc_html( isset( $statuses[ $status ] ) ? $statuses[ $status ] : $status ) . '</span>';
		} elseif ( 'leadtop_owner' === $column ) {
			echo esc_html( get_post_meta( $post_id, '_leadtop_owner', true ) ?: '—' );
		}
	}

	/**
	 * Status dropdown above the list.
	 *
	 * @param string $post_type Current post type.
	 * @return void
	 */
	public function render_status_filter( $post_type ) {
		if ( self::POST_TYPE !== $post_type ) {
			return;
		}
		$current = isset( $_GET['leadtop_status'] ) ? sanitize_key( wp_unslash( $_GET['leadtop_status'] ) ) : '';
		echo '<select name="leadtop_status"><option value="">全部状态</option>';
		foreach ( $this->statuses() as $key => $label ) {
			echo '<option value="' . esc_attr( $key ) . '" ' . selected( $current, $key, false ) . '>' . esc_html( $label ) . '</option>';
		}
		echo '</select>';

		$url = wp_nonce_url( admin_url( 'admin-post.php?action=leadtop_export_inquiries' ), 'leadtop_export_inquiries' );
		echo '<a class="button leadtop-export-button" href="' . esc_url( $url ) . '">导出 CSV</a>';
	}

	/**
	 * Apply the selected inquiry status.
	 *
	 * @param WP_Query $query Admin query.
	 * @return void
	 */
	public function apply_status_filter( $query ) {
		if ( ! is_admin() || ! $query->is_main_query() || self::POST_TYPE !== $query->get( 'post_type' ) ) {
			return;
		}
		if ( ! empty( $_GET['leadtop_status'] ) ) {
			$status = sanitize_key( wp_unslash( $_GET['leadtop_status'] ) );
			if ( array_key_exists( $status, $this->statuses() ) ) {
				$query->set(
					'meta_query',
					array(
						array(
							'key'   => '_leadtop_status',
							'value' => $status,
						),
					)
				);
			}
		}
	}

	/**
	 * Register bulk lifecycle changes.
	 *
	 * @param array<string,string> $actions Existing actions.
	 * @return array<string,string>
	 */
	public function register_bulk_actions( $actions ) {
		foreach ( $this->statuses() as $key => $label ) {
			$actions[ 'leadtop_status_' . $key ] = '设为：' . $label;
		}
		return $actions;
	}

	/**
	 * Apply bulk status changes.
	 *
	 * @param string $redirect_url Redirect URL.
	 * @param string $action       Selected action.
	 * @param int[]  $post_ids     Inquiry IDs.
	 * @return string
	 */
	public function handle_bulk_actions( $redirect_url, $action, $post_ids ) {
		if ( 0 !== strpos( $action, 'leadtop_status_' ) ) {
			return $redirect_url;
		}

		$status = substr( $action, strlen( 'leadtop_status_' ) );
		if ( ! array_key_exists( $status, $this->statuses() ) ) {
			return $redirect_url;
		}

		$count = 0;
		foreach ( $post_ids as $post_id ) {
			if ( current_user_can( 'edit_leadtop_inquiry', $post_id ) ) {
				update_post_meta( $post_id, '_leadtop_status', $status );
				++$count;
			}
		}

		return add_query_arg( 'leadtop_updated', $count, $redirect_url );
	}

	/**
	 * Show bulk update result.
	 *
	 * @return void
	 */
	public function bulk_action_notice() {
		if ( empty( $_GET['leadtop_updated'] ) ) {
			return;
		}
		$count = absint( $_GET['leadtop_updated'] );
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( sprintf( '已更新 %d 条询盘。', $count ) ) . '</p></div>';
	}

	/**
	 * Remove Quick Edit because submission fields should not be edited inline.
	 *
	 * @param array<string,string> $actions Row actions.
	 * @param WP_Post              $post    Current post.
	 * @return array<string,string>
	 */
	public function remove_quick_edit( $actions, $post ) {
		if ( self::POST_TYPE === $post->post_type ) {
			unset( $actions['inline hide-if-no-js'] );
			unset( $actions['view'] );
		}
		return $actions;
	}

	/**
	 * Register notification settings.
	 *
	 * @return void
	 */
	public function register_settings_page() {
		add_submenu_page(
			'edit.php?post_type=' . self::POST_TYPE,
			'询盘设置',
			'询盘设置',
			'manage_leadtop_inquiries',
			'leadtop-inquiries-settings',
			array( $this, 'render_settings_page' )
		);
	}

	/**
	 * Register and sanitize notification options.
	 *
	 * @return void
	 */
	public function register_settings() {
		register_setting(
			'leadtop_inquiries_settings',
			self::OPTION_KEY,
			array(
				'type'              => 'array',
				'sanitize_callback' => function ( $input ) {
					return array(
						'notify'             => empty( $input['notify'] ) ? '0' : '1',
						'recipients'          => isset( $input['recipients'] ) ? $this->sanitize_recipient_list( $input['recipients'] ) : '',
						'revalidate_url'      => isset( $input['revalidate_url'] ) ? esc_url_raw( $input['revalidate_url'] ) : '',
						'revalidate_secret'   => isset( $input['revalidate_secret'] ) ? sanitize_text_field( $input['revalidate_secret'] ) : '',
					);
				},
				'default'           => array( 'notify' => '1', 'recipients' => get_option( 'admin_email' ), 'revalidate_url' => '', 'revalidate_secret' => '' ),
			)
		);
	}

	/**
	 * Render settings and API connection guidance.
	 *
	 * @return void
	 */
	public function render_settings_page() {
		if ( ! current_user_can( 'manage_leadtop_inquiries' ) ) {
			return;
		}
		$options = wp_parse_args( get_option( self::OPTION_KEY, array() ), array( 'notify' => '1', 'recipients' => get_option( 'admin_email' ), 'revalidate_url' => '', 'revalidate_secret' => '' ) );
		?>
		<div class="wrap leadtop-settings">
			<h1>Leadtop 询盘设置</h1>
			<form action="options.php" method="post">
				<?php settings_fields( 'leadtop_inquiries_settings' ); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row">新询盘邮件通知</th>
						<td><label><input name="<?php echo esc_attr( self::OPTION_KEY ); ?>[notify]" type="checkbox" value="1" <?php checked( $options['notify'], '1' ); ?>> 保存成功后发送通知</label></td>
					</tr>
					<tr>
						<th scope="row"><label for="leadtop-recipients">通知邮箱</label></th>
						<td><input class="regular-text" id="leadtop-recipients" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[recipients]" type="text" value="<?php echo esc_attr( $options['recipients'] ); ?>"><p class="description">多个邮箱请用英文逗号分隔。</p></td>
					</tr>
					<tr>
						<th scope="row"><label for="leadtop-revalidate-url">博客刷新地址</label></th>
						<td><input class="regular-text code" id="leadtop-revalidate-url" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[revalidate_url]" type="url" value="<?php echo esc_attr( $options['revalidate_url'] ); ?>" placeholder="https://example.com/api/revalidate"><p class="description">文章发布、更新、移入回收站或删除后通知 Next.js 清理缓存。</p></td>
					</tr>
					<tr>
						<th scope="row"><label for="leadtop-revalidate-secret">博客刷新密钥</label></th>
						<td><input class="regular-text" id="leadtop-revalidate-secret" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[revalidate_secret]" type="password" value="<?php echo esc_attr( $options['revalidate_secret'] ); ?>" autocomplete="new-password"><p class="description">必须与 Next.js 的 WORDPRESS_REVALIDATE_SECRET 环境变量完全一致。</p></td>
					</tr>
				</table>
				<?php submit_button(); ?>
			</form>
			<hr>
			<h2>前端接口</h2>
			<p>接口地址：<code><?php echo esc_html( rest_url( self::REST_NS . self::REST_ROUTE ) ); ?></code></p>
			<p>该接口只接受已认证请求。建议创建一个角色为“Leadtop 询盘接口”的专用用户，为其生成 WordPress 应用密码，并仅在 Next.js 服务端保存凭据。</p>
		</div>
		<?php
	}

	/**
	 * Notify Next.js when a public blog post changes.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  Whether this is an update.
	 * @return void
	 */
	public function notify_content_change( $post_id, $post, $update ) {
		unset( $update );
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		$this->send_revalidation_webhook(
			array(
				'action'  => 'publish' === $post->post_status ? 'upsert' : 'unpublish',
				'post_id' => (int) $post_id,
				'slug'    => $post->post_name,
				'status'  => $post->post_status,
			)
		);
	}

	/**
	 * Notify Next.js before a blog post is permanently deleted.
	 *
	 * @param int          $post_id Post ID.
	 * @param WP_Post|null $post    Post object.
	 * @return void
	 */
	public function notify_content_deletion( $post_id, $post ) {
		if ( ! $post || 'post' !== $post->post_type ) {
			return;
		}

		$this->send_revalidation_webhook(
			array(
				'action'  => 'delete',
				'post_id' => (int) $post_id,
				'slug'    => $post->post_name,
				'status'  => 'deleted',
			)
		);
	}

	/**
	 * Send an authenticated, non-blocking cache refresh request.
	 *
	 * @param array<string,mixed> $payload Webhook body.
	 * @return void
	 */
	private function send_revalidation_webhook( $payload ) {
		$options = wp_parse_args( get_option( self::OPTION_KEY, array() ), array( 'revalidate_url' => '', 'revalidate_secret' => '' ) );
		if ( empty( $options['revalidate_url'] ) || empty( $options['revalidate_secret'] ) ) {
			return;
		}

		wp_remote_post(
			$options['revalidate_url'],
			array(
				'timeout'  => 3,
				'blocking' => false,
				'headers'  => array(
					'Authorization' => 'Bearer ' . $options['revalidate_secret'],
					'Content-Type'  => 'application/json',
				),
				'body'     => wp_json_encode( $payload ),
			)
		);
	}

	/**
	 * Normalize comma-separated email recipients.
	 *
	 * @param string $value Raw list.
	 * @return string
	 */
	private function sanitize_recipient_list( $value ) {
		$emails = array_filter( array_map( 'sanitize_email', preg_split( '/[;,\s]+/', (string) $value ) ) );
		return implode( ', ', array_unique( $emails ) );
	}

	/**
	 * Send a concise notification after a successful insert.
	 *
	 * @param int                  $post_id Inquiry ID.
	 * @param array<string,string> $data    Submitted values.
	 * @return void
	 */
	private function send_notification( $post_id, $data ) {
		$options = wp_parse_args( get_option( self::OPTION_KEY, array() ), array( 'notify' => '1', 'recipients' => get_option( 'admin_email' ) ) );
		if ( '1' !== $options['notify'] || empty( $options['recipients'] ) ) {
			return;
		}

		$recipients = array_filter( array_map( 'sanitize_email', preg_split( '/[;,\s]+/', $options['recipients'] ) ) );
		if ( empty( $recipients ) ) {
			return;
		}

		$subject = sprintf( '[Leadtop 新询盘] %s%s', isset( $data['name'] ) ? $data['name'] : '未知联系人', empty( $data['company'] ) ? '' : ' · ' . $data['company'] );
		$lines   = array( 'Leadtop 官网收到一条新询盘：', '' );
		foreach ( array( 'name', 'company', 'contact', 'phone', 'wechat', 'email', 'website', 'business_type', 'problem', 'needs', 'form_type', 'source_page' ) as $field ) {
			if ( ! empty( $data[ $field ] ) ) {
				$lines[] = $this->field_labels[ $field ] . '：' . $data[ $field ];
			}
		}
		$lines[] = '';
		$lines[] = '后台查看：' . admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		wp_mail( $recipients, $subject, implode( "\n", $lines ) );
	}

	/**
	 * Export all inquiry records to a UTF-8 CSV.
	 *
	 * @return void
	 */
	public function export_csv() {
		if ( ! current_user_can( 'manage_leadtop_inquiries' ) ) {
			wp_die( esc_html__( '您没有导出询盘的权限。', 'leadtop-inquiries' ), '', array( 'response' => 403 ) );
		}
		check_admin_referer( 'leadtop_export_inquiries' );

		$inquiries = get_posts(
			array(
				'post_type'      => self::POST_TYPE,
				'post_status'    => array( 'private', 'publish' ),
				'posts_per_page' => -1,
				'orderby'        => 'date',
				'order'          => 'DESC',
			)
		);

		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="leadtop-inquiries-' . gmdate( 'Y-m-d' ) . '.csv"' );
		$output = fopen( 'php://output', 'w' );
		if ( false === $output ) {
			wp_die( esc_html__( '无法创建导出文件。', 'leadtop-inquiries' ) );
		}

		fwrite( $output, "\xEF\xBB\xBF" );
		$headers = array_merge( array( 'ID', '提交时间', '状态', '负责人' ), array_values( $this->field_labels ), array( '跟进备注', '隐私同意' ) );
		fputcsv( $output, $headers );

		foreach ( $inquiries as $inquiry ) {
			$status   = get_post_meta( $inquiry->ID, '_leadtop_status', true ) ?: 'new';
			$statuses = $this->statuses();
			$row      = array(
				$inquiry->ID,
				get_post_time( 'Y-m-d H:i:s', false, $inquiry ),
				isset( $statuses[ $status ] ) ? $statuses[ $status ] : $status,
				get_post_meta( $inquiry->ID, '_leadtop_owner', true ),
			);
			foreach ( array_keys( $this->field_labels ) as $field ) {
				$row[] = $this->csv_safe( get_post_meta( $inquiry->ID, '_leadtop_' . $field, true ) );
			}
			$row[] = $this->csv_safe( get_post_meta( $inquiry->ID, '_leadtop_notes', true ) );
			$row[] = '1' === get_post_meta( $inquiry->ID, '_leadtop_consent', true ) ? '是' : '否';
			fputcsv( $output, $row );
		}

		fclose( $output );
		exit;
	}

	/**
	 * Avoid spreadsheet formula execution in exported user-controlled fields.
	 *
	 * @param mixed $value Cell value.
	 * @return string
	 */
	private function csv_safe( $value ) {
		$value = (string) $value;
		if ( preg_match( '/^[=+\-@]/', $value ) ) {
			return "'" . $value;
		}
		return $value;
	}

	/**
	 * Load styles only on this plugin's screens.
	 *
	 * @param string $hook_suffix Current admin hook.
	 * @return void
	 */
	public function enqueue_admin_assets( $hook_suffix ) {
		$screen = get_current_screen();
		if ( ! $screen || self::POST_TYPE !== $screen->post_type ) {
			return;
		}
		wp_enqueue_style( 'leadtop-inquiries-admin', LEADTOP_INQUIRIES_URL . 'assets/admin.css', array(), LEADTOP_INQUIRIES_VERSION );
	}
}
