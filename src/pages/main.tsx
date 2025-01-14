import { type NextPage } from "next";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import { useGlobalContext } from '../context';
import {getAuth} from "firebase/auth";
import {FirebaseAuth} from "@firebase/auth-types";
import Loader from "react-loader-spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {height} from "dom-helpers";
import {min} from "@popperjs/core/lib/utils/math";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'


//localIngredients is the local value updated every time the contents of the text box are changed
let localIngredientsList:string
const RecipeGenerator: NextPage = () => {

  //Import the global variable ingredientsList, and it's setter function, from the global context (defined in the context folder)
  const { ingredientsList,setIngredientsList } = useGlobalContext();
  console.log("global context "+ingredientsList);

  const [currentUser, setCurrentUser] = useState({uid:"",displayName:"", photoURL:"", savedRecipes:[""], uploadedRecipes:[""]});

    useEffect(() => {
        //eslint-disable-next-line
        const user:customUser = JSON.parse(localStorage.getItem('user')+"");
        console.log("Calling useEffect "+JSON.stringify(user))
        if (user) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCurrentUser(user);
        }
    }, []);
    // Check if its loading
  const [isLoading, setIsLoading] = useState(false);

  console.log("current user: (accessed from main screen)"+currentUser.displayName)
    const slideImages = [
        {
            url: 'https://media.istockphoto.com/id/1345890540/photo/honey-baklava-with-walnuts-on-black-slate-portions-of-oriental-sweets-turkish-sugary-pieces.jpg?s=612x612&w=0&k=20&c=Zxn3pdiLLrdqIAVGqSsLc3fgKz3k4BwAkJrOxMIU2y4=',
            altText: 'fruit_bowls'
        },
        {
            url: 'https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking-1024x683.jpg',
            altText: 'fruit_bowls'
        },
        {
            url: 'https://www.foodiesfeed.com/wp-content/uploads/2019/06/beautiful-vibrant-shot-of-traditional-korean-meals-1024x683.jpg',
            altText: 'espresso-with-carrot-cake'
        },
        {
            url: 'https://media.istockphoto.com/id/185406000/photo/authentic-crawfish-etoufee-in-a-clean-white-dish.jpg?s=612x612&w=0&k=20&c=DG14_XyJiuz6NpfMDENOE4NrdciAsTmc5Jz0BwHcJiA=',
            altText: 'espresso-with-carrot-cake'
        },
        {
            url: 'https://media.istockphoto.com/id/692557700/photo/burger.jpg?s=612x612&w=0&k=20&c=8ajzPWqvrLvl779OI3XMFR_tZV5V-7VSDlSeaX47Uhk='
        },
        {//new slide
            url: 'https://media.istockphoto.com/id/543663322/photo/meat-lasagna.jpg?s=612x612&w=0&k=20&c=nYLF1yuCTxIMwQ0JjnAT3_fd7ZqsAds1RO4FOinimZ4=',
            altText: 'fruit_bowls'

        }
    ];
    const spanStyle = {
        background: '#efefef',
        color: '#000000'
    }

    const divStyle = {
        backgroundSize: 'center',
        height: '375px',
        width: '800px'
    }

    return (
    <section className="bg-gray-30">
        <div className="font-extrabold text-red-700 sm:block text-3xl">
              <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47TpryE5rmsWr5aef5ZLXJMYr-socetxFw&usqp=CAU'
                  className="w-32 ml-2"
              />
              <strong>
                  SuperChef.
              </strong>
         </div>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center relative">
        <div className="mx-auto max-w-xl text-center mt-6">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <strong className="font-extrabold text-red-700 sm:block">
              Enter Ingredients
            </strong>
          </h1>
          {isLoading ? (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <IngredientsInput />
            <Link
              href={{
                pathname: '/results',
                query: {
                  ingredients: ingredientsList,
                },
              }}
            >
              <button
                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                onClick={() => {
                  setIsLoading(true);
                }}
              >
                Enter
              </button>
            </Link>
          </div>
          )
        }
            <div className="mx-auto max-w-screen-lg px-10 py-10 lg:justify-items-center relative">
                <Slide>
                    {slideImages.map((slideImage, index)=> (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>

                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
        <Navbar className="navbar-container mt-2 sm:text-xl">

            <ul className="align-items:center">
                <li className="font-bold text-black sm:block ">
                    <Link
                        href={{
                            pathname: '/upload_recipe',
                            query: {
                                uid: currentUser.uid,
                            },

                        }}
                    >Upload Recipe
                    </Link>
                </li>
                <li className="font-bold text-black sm:block">
                    <Link
                        href={{
                            pathname: '/favorites',
                            query: {
                                uid: currentUser.uid,
                            },
                        }}
                    >Favorites
                    </Link>
                </li>
                <li className="font-bold text-black sm:block">
                    <Link
                        href={{
                            pathname: '/all_saved_recipes',
                            query: {
                                uid: currentUser.uid,
                            },
                        }}>See All Recipes
                    </Link>
                </li>
            </ul>
        </Navbar>
      </div>
      </div>
        <footer className="flex flex-col space-y-5 justify-center m-10 position-relative">
               <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                   <Link href="/">
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
//Ingredients input field
function IngredientsInput(){
    const { ingredientsList,setIngredientsList } = useGlobalContext();
    //Save the state of the value entered into the text box
  const [ingredients, setIngredients] = useState("");
  return (
      <>
          <form>
              <input
                  type="text"
                  value={ingredients}
                  //whenever the value of the text box is changed, save it in localIngredientsList so it can be accessed in the outer function above
                  onChange={e => {
                      setIngredients(e.target.value);
                      localIngredientsList = e.target.value;
                      console.log(localIngredientsList);
                      setIngredientsList(localIngredientsList);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="avocado"
                  required
              ></input>
          </form>
</>
)
}

export default RecipeGenerator;