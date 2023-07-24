// get path from url like "/workspace/abc" => "abc" or "/workspace/abc/dfd" => "abc" or "/workspace/abc/dfd/dfdf" => "abc"
export const pathExtractor = (url: string) => {
  const path = url.split("/");
  return path[2];
};
