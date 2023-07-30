import React, { useEffect, useState, FormEvent } from "react";
import Modal from "../../../components/Modal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../auth/authSlice";
import useUserImage from "../../../app/utils/hooks/useUserImage";
import {
  useUpdateProfileMutation,
  useUpdateProfilePreferenceMutation,
} from "./profileApiSlice";
import showToast from "../../../app/utils/hooks/showToast";
import {
  useGetArticlesQuery,
  useGetAuthorsQuery,
  useGetSourcesQuery,
} from "../dashboard/articlesApiSlice";
import AuthorsList from "./components/AuthorsList";
import SourcesList from "./components/SourcesList";

interface IProfilePreference {
  showProfilePreference: boolean;
  setShowProfilePreference: React.SetStateAction<any>;
}

const ProfilePreference = ({
  showProfilePreference,
  setShowProfilePreference,
}: IProfilePreference) => {
  const currentUser = useSelector(selectCurrentUser);
  const userImage = useUserImage(currentUser);
  const [preferredAuthors, setPreferredAuthors] = useState<string[]>([]);
  const [preferredSources, setPreferredSources] = useState<string[]>([]);
  const [updateProfilePreference, {isError, error: updateProfileError }]: any =
    useUpdateProfilePreferenceMutation();

  const updateUserProfile = async (e: FormEvent) => {
    e.preventDefault();
    let data = { preferred_sources:preferredSources, preferred_authors:preferredAuthors };
    try {
      await updateProfilePreference(data).unwrap();
      if (isError) return showToast("error", updateProfileError?.data?.message);
      showToast("success", "Profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const { preferred_authors, preferred_sources } = currentUser.profile;
  // const sources = [...new Set(articles.map((a:any)=>a.attributes.source_name))] as string[]
  // const authors = [...new Set(articles.map((a:any)=>a.attributes.author))] as string[]
useEffect(() => {
  setPreferredAuthors(prev=>[...prev,...preferred_authors as string[]])
  setPreferredSources(prev=>[...prev,...preferred_sources as string[]] )
  
}, [preferred_authors,preferred_sources])
  
  const { authors } = useGetAuthorsQuery("articlesList", {
    selectFromResult: ({ data }) => ({
      authors: data && Object.values(data),
    }),
  });
  const { sources } = useGetSourcesQuery("articlesList", {
    selectFromResult: ({ data }) => ({
      sources: data && Object.values(data),
    }),
  });
  // Add/Remove checked item from list
  const handlePreferredAuthorsCheck = (event: any) => {
    var updatedList = [...preferredAuthors];
    if (event.target.value! && !preferredAuthors.includes(event.target.value!) ) {
      updatedList = [...preferredAuthors, event?.target?.value!];
    } else {
      updatedList.splice(preferredAuthors.indexOf(event?.target?.value!), 1);
    }
    setPreferredAuthors([...new Set(updatedList)]);
  console.log(preferredAuthors)
  };
  const handlePreferredSourcesCheck = (event: any) => {
    var updatedList = [...preferredSources];
    if (event.target.value! && !preferredSources.includes(event.target.value!)) {
      updatedList = [...preferredSources, event?.target?.value!];
    } else {
      updatedList.splice(preferredSources.indexOf(event?.target?.value!), 1);
    }
    setPreferredSources([...new Set(updatedList)]);
  };

  return (
    <>
      <Modal
        isVisible={showProfilePreference}
        onClose={() => setShowProfilePreference(false)}
        size="contain"
      >
        <form
          className=""
          onSubmit={updateUserProfile}
        >
          <div className="flex items-start justify-between p-3  border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Feeds Preference
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-1 grid-cols-2 mb-3 h-[25rem]  overflow-y-auto scrollbar scroll-m-4 scrollbar overscroll-contain transition-all duration-200 ease-in-out">
            <div className="md:col-span-6">
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Choose Authors:
              </h3>
              <ul className="w-full overflow-y-auto over px-5 scrollbar scroll-m-4 h-80 scrollbar overscroll-contain transition-all duration-200 ease-in-out">
                {authors?.map(
                  (author: string, i: number) =>
                    author && (
                      <AuthorsList
                        isUserPreference={preferredAuthors?.includes(author) as boolean}
                        key={i}
                        author={author}
                        i={i}
                        handlePreferredAuthorsCheck={
                          handlePreferredAuthorsCheck
                        }
                      />
                    )
                )}
              </ul>
            </div>
            <div  className="md:col-span-6">
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Choose Sources:
              </h3>
              <ul className="w-full  overflow-y-auto px-5 scrollbar scroll-m-4 scroll-thin  scrollbar overscroll-contain h-80 transition-all duration-200 ease-in-out">
                {sources?.map(
                  (source: string, i: number) =>
                    source && (
                      <SourcesList
                        isUserPreference={preferredSources?.includes(source) as boolean}
                        key={i}
                        source={source}
                        i={i}
                        handlePreferredSourcesCheck={
                          handlePreferredSourcesCheck
                        }
                      />
                    )
                )}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className=" place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(ProfilePreference);
