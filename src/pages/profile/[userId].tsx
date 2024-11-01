import instance from "@/lib/axiosClient";
import { PostType, Profile } from "@/types/Posts";
import { GetServerSideProps } from "next";

type ProfileProps = {
  profile: Profile;
  posts: PostType[];
};

// SSRでAPIを叩く

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  try {
    // apiを叩く

    const profileResponse = await instance.get<Profile>(
      `/users/profile/${userId}`,
    );

    const postsResponse = await instance.get<PostType>(`/posts/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
        posts: postsResponse.data,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      notFound: true,
    };
  }
};

const ProfilePage = ({ profile, posts }: ProfileProps) => {
  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto mb-4 max-w-xl bg-white p-10 shadow-lg">
            <div className="flex items-center gap-8">
              <img alt="プロフィール画像" src={profile.profileImageUrl} />
              <div>
                <h2 className="text-xl font-bold">{profile.user.username}</h2>
                <p className="text-lg text-slate-600">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-4 py-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="mx-auto mb-4 max-w-xl bg-white p-4 shadow-lg"
            >
              <div className="flex items-center">
                <img
                  src={profile.profileImageUrl}
                  alt="プロフィール画像"
                  className="mr-4 h-20 w-20 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold">{post.author.username}</p>
                  <p className="text-base text-slate-600">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-left text-lg">
                投稿:
                <span className="text-xl font-bold text-slate-600">
                  {post.content}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
