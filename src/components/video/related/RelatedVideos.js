import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const { data, isError, isLoading, error } = useGetRelatedVideosQuery({
    id,
    title,
  });
  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>{error.message}</p>;
  if (!isLoading && !isError && data.length === 0)
    content = <p>No videos found</p>;
  if (!isLoading && !isError && data.length > 0) {
    content = data.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
