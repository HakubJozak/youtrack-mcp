# frozen_string_literal: true

require "minitest/autorun"
require "vcr"
require "dotenv/load"
require "zeitwerk"

# Setup autoloading with Zeitwerk
loader = Zeitwerk::Loader.new
loader.push_dir(File.expand_path("../lib", __dir__))
loader.setup

# Configure VCR for testing API calls
VCR.configure do |config|
  config.cassette_library_dir = "test/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.filter_sensitive_data("<YOUTRACK_TOKEN>") { ENV["YOUTRACK_MCP_TOKEN"] }
  config.filter_sensitive_data("<YOUTRACK_URL>") { ENV["YOUTRACK_MCP_URL"] }
end