ExUnit.start

Mix.Task.run "ecto.create", ~w(-r PhoenixJsGame.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r PhoenixJsGame.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(PhoenixJsGame.Repo)

