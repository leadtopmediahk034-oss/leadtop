<?php
/**
 * Plugin Name: Leadtop 询盘管理
 * Plugin URI:  https://leadtopmedia.com/
 * Description: 管理 Leadtop 官网询盘，并在文章发布、更新或删除时通知 Next.js 自动刷新博客。
 * Version:     1.1.0
 * Author:      Leadtop
 * Text Domain: leadtop-inquiries
 * Requires at least: 6.4
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'LEADTOP_INQUIRIES_VERSION', '1.1.0' );
define( 'LEADTOP_INQUIRIES_FILE', __FILE__ );
define( 'LEADTOP_INQUIRIES_DIR', plugin_dir_path( __FILE__ ) );
define( 'LEADTOP_INQUIRIES_URL', plugin_dir_url( __FILE__ ) );

require_once LEADTOP_INQUIRIES_DIR . 'includes/class-leadtop-inquiries.php';

register_activation_hook( __FILE__, array( 'Leadtop_Inquiries', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Leadtop_Inquiries', 'deactivate' ) );

Leadtop_Inquiries::instance();
