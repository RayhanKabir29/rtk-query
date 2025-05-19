import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

export default function Videos() {
  const { data, error, isLoading, isError } = useGetVideosQuery();

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>{error.message}</p>;
  if (!isLoading && !isError && data.length === 0)
    content = <p>No videos found</p>;
  if (!isLoading && !isError && data.length > 0) {
    content = data.map((video) => <Video key={video.id} video={video} />);
  }
  return <>{content}</>;
}
