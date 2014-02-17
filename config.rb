# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "public"
fonts_dir = "public/fonts"
sass_dir = "app/scss"
images_dir = "public/img"
javascripts_dir = "app/js"
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
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
