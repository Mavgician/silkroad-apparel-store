import { Spinner } from "reactstrap"

function Loading() {
    return (
        <main className="d-flex justify-content-center align-items-center p-0">
            <h1>Processing your order...</h1>
            <Spinner></Spinner>
        </main>
    )
}

export default Loading