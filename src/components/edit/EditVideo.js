import { useParams } from "react-router-dom";
import Form from "./Form";
import { useGetVideoQuery } from "../../features/api/apiSlice";

export default function EditVideo() {
      const { videoId } = useParams();
      const { data, isError, isLoading, error } = useGetVideoQuery(videoId);
      console.log("Data from", data);
        let content = null;
        if (isLoading) content = <p>Loading...</p>;
        if (!isLoading && isError) content = <p>{error.message}</p>;
        if (!isLoading && !isError && data) {
            content = <Form video={data} />;
        }
    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-0">
            <div className="w-full">
                <div className="px-4 sm:px-0 pb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Edit video
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Please fillup the form to edit video
                    </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    {content}
                </div>
            </div>
        </div>
    );
}
