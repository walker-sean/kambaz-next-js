import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-profile-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/account/signin"
        id="wd-signin-link"
        className="list-group-item active border-0"
      >
        Signin
      </Link>
      <br />
      <Link
        href="/account/signup"
        id="wd-signup-link"
        className="list-group-item text-danger border-0"
      >
        Signup
      </Link>
      <br />
      <Link
        href="/account/profile"
        id="wd-profile-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>
      <br />
    </div>
  );
}
