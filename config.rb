# Set this to the root of your project when deployed:
javascripts_dir = "client/javascripts"
sass_dir = "client/stylesheets"
css_dir = "tmp/public"
images_dir = "public/img"
fonts_dir = "public/fonts"

http_path = "/"
http_images_path = "/img"
http_fonts_path = "/fonts"

additional_import_paths = ["bower_components/foundation/scss"]

cache_path = 'tmp/.sass-cache'

sass_options = {
  :debug_info => true
  # If true, it turns on the display of SCSS file path
  # for the SCSS support on Google Chrome Web Developer Tool.
}

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = false

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
