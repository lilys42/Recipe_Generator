import { type NextPage } from "next";
import Link from "next/link";
import React, {useEffect, useState} from 'react';
import {set} from "zod";
import {child, get, getDatabase, goOffline, query, ref} from "firebase/database";
import {db, auth, app} from "../context/firebaseSetup";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {useGlobalContext} from "../context";
import {getCookie, setCookies} from "cookies-next";

//----For definitions for the Recipe, RecipeFromAPI, RecipeContext, and Comment types, see index.d.ts in the types folder----

//When this page is loaded, the getServerSideProps function (further down) runs first, and returns a prop object to the Results component.
//props is an array of Recipe objects.
const Favorites: React.FC<RecipeArray>= (props) => {
    //Import the current user.
  //  const {currentUser, setCurrentUser}=useGlobalContext();
    console.log("recipes from props\n")
    console.log(props.recipeList)

    const [currentUser, setCurrentUser] = useState({uid:"",displayName:"", photoURL:"", savedRecipes:"", uploadedRecipes:""});

    useEffect(() => {
        //eslint-disable-next-line
        const user:customUser = JSON.parse(localStorage.getItem('user')+"");
        console.log("Calling useEffect in favorites screen"+JSON.stringify(user))
        if (user) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCurrentUser(user);
        }
    }, []);

    const recipeArray:Recipe[]=[]
    for(let i=0;i<props.recipeList.length;i++) {
        //    recipeCounter[i]=i;
    }
    props.recipeList.forEach((r)=>{
        if(r!==undefined&&r!==null)
            recipeArray.push(r)
    })

    return (
        <section>
            <nav className="font-extrabold text-red-700 sm:block text-3xl">
                <div className="font-extrabold text-red-700 sm:block text-3xl">
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47TpryE5rmsWr5aef5ZLXJMYr-socetxFw&usqp=CAU'
                        className="w-32 ml-2"

                    />
                    <strong>
                        SuperChef.
                    </strong>
                </div>
            </nav>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto text-left">
                <h1 className="text-2xl font-bold sm:text-3xl">Favorites</h1>
            </div>
            <div className="mt-6 w-full bg-white rounded-lg shadow-lg lg:w">
                <div>
                    {recipeArray.map((recipe) =>
                        <div key={recipe.id}>
                        <div className="mt-6 w-full bg-white rounded-lg shadow-lg lg:w">
                                <Link href={{
                                    pathname: '/recipe',
                                    query: {recipeString:JSON.stringify(recipe)}
                                }} as={`recipe/`} onClick={() => {
                                    setCookies('recipe', recipe);
                                    //eslint-disable-next-line
                                    console.log("cookie "+getCookie('recipe'))}}>
                                    <ul className="divide-y-2 divide-gray-100">
                                        <li className="p-3 hover:bg-red-600 hover:text-red-200">
                                            <pre className="italic">{
                                                recipe.title}</pre>
                                        </li>
                                    </ul>
                                </Link>
                            </div>
                        </div>)}
                </div>

                <Link href="/main">
                    <button
                        className="block w-full mt-6 rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    >
                        Back
                    </button>
                </Link>

            </div>
        </div>
            <footer className="flex flex-col space-y-5 justify-center m-10 position-relative">
                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <Link href="/main">
                        Home</Link>
                </nav>

                <div className="flex justify-center space-x-5">
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47TpryE5rmsWr5aef5ZLXJMYr-socetxFw&usqp=CAU'
                        className="w-12 ml-2 justify-left"
                    />
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png"/>
                    </a>
                </div>
                <p className="text-center text-gray-700 font-medium">&copy; 2023 Company Ltd. All rights reserved.</p>
            </footer>
        </section>
    );
}
/*
getServerSideProps runs when the link on the main page is clicked. It loads the current user's saved recipes from the database
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps (context:UserContext) {
    const recipeList:Recipe[]=[]
    let recipeIds:string[]=[]
    //This try/catch block pulls in the recipes from the database
    try{
        const userRef=ref(getDatabase(app),'users/'+context.query.uid)
        console.log("user ref "+JSON.stringify(userRef))
        await get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const u:customUser=snapshot.val() as customUser
                if(u.savedRecipes!==undefined)
                    recipeIds=u.savedRecipes
                else
                    recipeIds=[""]
                console.log(recipeIds)
            }
        });
        for(let i=0;i<recipeIds.length;i++){
            let queryString='recipes/'
            queryString+=recipeIds[i] as string
            const recipeRef =query(ref(getDatabase(app), queryString));
            await get(recipeRef).then((snapshot)=>{
                const r:Recipe=snapshot.val() as Recipe
                recipeList.push(r);
                if(recipeList.length===recipeIds.length){
                    console.log("about to return")
                    recipeList.forEach((r)=>{
                        console.log(r.title)})
                    return {
                        props: {recipeList}
                    }
                }
            })
        }
    }
    catch(e){
        console.log(e)
    }
    /*goOffline(db)
    goOffline(getDatabase(app))*/
    return{
        props:{recipeList}
    }
}
export default Favorites;