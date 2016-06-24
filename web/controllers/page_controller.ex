defmodule PhoenixJsGame.PageController do
  use PhoenixJsGame.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
