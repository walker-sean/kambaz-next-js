import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
        Northeastern
      </a>
      <br />
      <Link href="signin"> Signin </Link> <br />
      <Link href="signup"> Signup </Link> <br />
      <Link href="profile"> Profile </Link> <br />
    </div>
  );
}
