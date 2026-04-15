import React from "react";
import Error from "./Error";

const NoData = () => {
  return (
    <div class="flex  items-center justify-center ">
      <div class="text-center  max-w-md">
        <Error></Error>
        <h1 class="text-3xl font-bold  mb-2">No Data Found</h1>
        <p class=" mb-6">
          Looks like nothing is here yet. Start adding something to see it appear here.
        </p>
      </div>
    </div>
  );
};

export default NoData;
