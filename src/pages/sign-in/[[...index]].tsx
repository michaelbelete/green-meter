import { SignIn } from "@clerk/nextjs";
import { type NextPage } from "next";

const SignInPage: NextPage = (props) => (
  <div className="-mt-20 flex h-screen flex-col items-center justify-center">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl="/flight"
    />
  </div>
);

export default SignInPage;
