<?php
/**
 * Plugin Name:       Gutenberg Example Dynamic
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-example-dynamic
 *
 * @package           create-block
 */

/**
 * Server side rendering of content
 */
function gutenberg_example_dynamic_render_callback( $block_attributes, $content ) {
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => 1,
		'post_status' => 'publish',
	) );

	if ( count( $recent_posts ) === 0 ) {
		return 'No posts';
	}

	$post = $recent_posts[ 0 ];
	$post_id = $post['ID'];
	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf(
		'<a %3$s class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) ),
		$wrapper_attributes
	);
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenberg_example_dynamic() {
	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );

	wp_register_script(
		'gutenberg-example-dynamic',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	register_block_type( 'create-block/gutenberg-example-dynamic', array(
		'api_version' => 2,
		'title' => 'Gutenberg Example Dynamic',
		'editor_script' => 'gutenberg-example-dynamic',
		'render_callback' => 'gutenberg_example_dynamic_render_callback',
		'icon' => 'smiley',
		'supports' => array( 'color' => true ),
	) );

}
add_action( 'init', 'gutenberg_example_dynamic' );
