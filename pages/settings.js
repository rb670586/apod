import Settings from '../components/Settings';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="/Images/profile.jpg" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h3 class="card-title text-center">Edit Profile</h3>
                        <Settings />
                    </div>
                </div>
            </div>
        </div>
    );
}
