# frozen_string_literal: true

require "test_helper"


class YoutrackApiClientTest < Minitest::Test

  TEST_PROJECT = 'YMS'

  def setup
    @client = YoutrackApiClient.new
  end

  def test_get_projects
    VCR.use_cassette("get_projects") do
      projects = @client.get_projects
      refute_nil projects
      refute_empty projects
      assert_equal TEST_PROJECT, projects.first[:shortName]
    end
  end

  def test_get_project
    VCR.use_cassette("get_project") do
      project = @client.get_project(TEST_PROJECT)
      refute_nil project
      assert_equal TEST_PROJECT, project[:shortName]
    end
  end
end