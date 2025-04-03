class YoutrackService

  private

    def default_project
      ENV.fetch('YOUTRACK_MCP_PROJECT')
    end
end