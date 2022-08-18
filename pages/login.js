import Login from "../components/Login";

export default function login() {
    return (
        <>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="/Images/login.jpg"
                            class="img-fluid"  alt="login" title="login"/>
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title text-center">Login</h3>
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}