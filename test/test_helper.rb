# frozen_string_literal: true

require "minitest/autorun"
require "vcr"
require "dotenv/load"

# Require all files from lib directory
$LOAD_PATH.unshift File.expand_path("../lib", __dir__)
Dir[File.expand_path("../lib/**/*.rb", __dir__)].sort.each { |file| require file }

# Configure VCR
VCR.configure do |config|
  config.cassette_library_dir = "test/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.filter_sensitive_data("<YOUTRACK_TOKEN>") { ENV["YOUTRACK_MCP_TOKEN"] }
  config.filter_sensitive_data("<YOUTRACK_URL>") { ENV["YOUTRACK_MCP_URL"] }
end