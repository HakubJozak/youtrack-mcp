# frozen_string_literal: true

require "test_helper"


class YoutrackApiClientTest < Minitest::Test
  def setup
    @client = YoutrackApiClient.new
  end

  def test_it_works
    assert true
  end

  def test_get_projects
    VCR.use_cassette("get_projects") do
      projects = @client.get_projects
      refute_nil projects
      refute_empty projects
    end
  end

  # def test_get_project
  #   VCR.use_cassette("get_project") do
  #     project_id = ENV["YOUTRACK_MCP_PROJECT"]
  #     project = @client.get_project(project_id)
  #     refute_nil project
  #     assert_includes project, project_id
  #   end
  # end
end