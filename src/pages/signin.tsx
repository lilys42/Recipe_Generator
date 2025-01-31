import { type NextPage } from "next";
import Link from "next/link";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import { app,db } from "../context/firebaseSetup"
import {useRouter} from "next/router";

const SignIn: NextPage = () => {
    return (

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        </div>

        <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
            <div>
            <label className="sr-only">Email</label>

            <div className="relative">
                <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                </svg>
                </span>
            </div>
            </div>

            <div>
            <label
             className="sr-only">Password</label>
            <div className="relative">
                <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter password"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
                </span>
            </div>
            </div>

            <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
                No account?
               <Link className="underline" href="#"> Sign up </Link>
            </p>

            <Link href="/main">
            <button
                className="ml-3 inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white"
            >
                 Sign in
            </button>
            </Link>
            </div>
        </form>
        </div>

    );
}

export default SignIn;