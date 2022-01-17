import fastapi


def register_routers(app: fastapi.FastAPI):
    from . import (
        account,
        problem,
        public,
        submission,
    )

    app.include_router(public.router)
    app.include_router(account.router)
    app.include_router(problem.router)
    app.include_router(submission.router)
