<!doctype html>
<html>
  <head>
    <meta charset="utf-8">

    <!-- Always force latest IE rendering engine or request Chrome Frame -->
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">

    <!-- Use title if it's in the page YAML frontmatter -->
    <title>The Middleman</title>

    <link href="../../../../stylesheets/normalize.css" rel="stylesheet" type="text/css" /><link href="../../../../stylesheets/all.css" rel="stylesheet" type="text/css" />
    <script src="../../../../javascripts/all.js" type="text/javascript"></script>
  </head>

  <body class="src src_app src_app_rmr_app src_app_rmr_app_scss src_app_rmr_app_scss_ionic">
    /*
Error: File to import not found or unreadable: www/lib/ionic/scss/ionic.
       Load paths:
         /Applications/XAMPP/xamppfiles/htdocs/rmr/source/stylesheets
         /usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets
         Compass::SpriteImporter
        on line 22 of /Applications/XAMPP/xamppfiles/htdocs/rmr/source/src/app/rmr_app/scss/ionic.app.scss

17: 
18: // The path for our ionicons font files, relative to the built CSS in www/css
19: $ionicons-font-path: "../lib/ionic/fonts" !default;
20: 
21: // Include all of Ionic
22: @import "www/lib/ionic/scss/ionic";

Backtrace:
/Applications/XAMPP/xamppfiles/htdocs/rmr/source/src/app/rmr_app/scss/ionic.app.scss:22
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/import_node.rb:67:in `rescue in import'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/import_node.rb:45:in `import'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/import_node.rb:28:in `imported_file'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/import_node.rb:37:in `css_import?'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:311:in `visit_import'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:36:in `visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:158:in `block in visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/stack.rb:79:in `block in with_base'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/stack.rb:115:in `with_frame'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/stack.rb:79:in `with_base'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:158:in `visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:52:in `block in visit_children'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:52:in `map'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:52:in `visit_children'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:167:in `block in visit_children'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:179:in `with_environment'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:166:in `visit_children'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:36:in `block in visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:186:in `visit_root'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/base.rb:36:in `visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:157:in `visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/visitors/perform.rb:8:in `visit'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/root_node.rb:36:in `css_tree'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/tree/root_node.rb:20:in `render'
/usr/local/lib/ruby/gems/2.2.0/gems/sass-3.4.19/lib/sass/engine.rb:278:in `render'
/usr/local/lib/ruby/gems/2.2.0/gems/compass-import-once-1.0.5/lib/compass/import-once/engine.rb:17:in `block in render'
/usr/local/lib/ruby/gems/2.2.0/gems/compass-import-once-1.0.5/lib/compass/import-once/engine.rb:29:in `with_import_scope'
/usr/local/lib/ruby/gems/2.2.0/gems/compass-import-once-1.0.5/lib/compass/import-once/engine.rb:16:in `render'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/renderers/sass.rb:87:in `evaluate'
/usr/local/lib/ruby/gems/2.2.0/gems/tilt-1.4.1/lib/tilt/template.rb:103:in `render'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/rendering.rb:303:in `render_individual_file'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/rendering.rb:181:in `_render_with_all_renderers'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/rendering.rb:149:in `render_template'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/sitemap/resource.rb:127:in `block in render'
/usr/local/lib/ruby/gems/2.2.0/gems/activesupport-4.1.13/lib/active_support/notifications.rb:161:in `instrument'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/util.rb:41:in `instrument'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/application.rb:235:in `instrument'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/sitemap/resource.rb:14:in `instrument'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/sitemap/resource.rb:100:in `render'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/request.rb:260:in `process_request'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/request.rb:210:in `block in call!'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/request.rb:209:in `catch'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/request.rb:209:in `call!'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/core_extensions/request.rb:195:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/urlmap.rb:66:in `block in call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/urlmap.rb:50:in `each'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/urlmap.rb:50:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-php-0.0.3/lib/middleman-php/middleware.rb:14:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/head.rb:13:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/lint.rb:49:in `_call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/lint.rb:37:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-1.6.4/lib/rack/builder.rb:153:in `call'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-test-0.6.3/lib/rack/mock_session.rb:30:in `request'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-test-0.6.3/lib/rack/test.rb:244:in `process_request'
/usr/local/lib/ruby/gems/2.2.0/gems/rack-test-0.6.3/lib/rack/test.rb:58:in `get'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:255:in `render_to_file'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:221:in `build_resource'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:213:in `each'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:213:in `execute!'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:128:in `invoke!'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/actions.rb:94:in `action'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli/build.rb:70:in `build'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/command.rb:27:in `run'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/invocation.rb:126:in `invoke_command'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor.rb:359:in `dispatch'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/base.rb:440:in `start'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli.rb:72:in `method_missing'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/command.rb:29:in `run'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/command.rb:126:in `run'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/invocation.rb:126:in `invoke_command'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor.rb:359:in `dispatch'
/usr/local/lib/ruby/gems/2.2.0/gems/thor-0.19.1/lib/thor/base.rb:440:in `start'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/lib/middleman-core/cli.rb:20:in `start'
/usr/local/lib/ruby/gems/2.2.0/gems/middleman-core-3.3.12/bin/middleman:18:in `<top (required)>'
/usr/local/bin/middleman:23:in `load'
/usr/local/bin/middleman:23:in `<main>'
*/
body:before {
  white-space: pre;
  font-family: monospace;
  content: "Error: File to import not found or unreadable: www/lib/ionic/scss/ionic.\A        Load paths:\A          /Applications/XAMPP/xamppfiles/htdocs/rmr/source/stylesheets\A          /usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets\A          Compass::SpriteImporter\A         on line 22 of /Applications/XAMPP/xamppfiles/htdocs/rmr/source/src/app/rmr_app/scss/ionic.app.scss\A \A 17: \A 18: // The path for our ionicons font files, relative to the built CSS in www/css\A 19: $ionicons-font-path: \"../lib/ionic/fonts\" !default;\A 20: \A 21: // Include all of Ionic\A 22: @import \"www/lib/ionic/scss/ionic\";"; }

  </body>
</html>
