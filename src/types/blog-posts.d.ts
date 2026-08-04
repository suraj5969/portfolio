declare module "virtual:blog-posts" {
  import type { BlogPost } from "@/types";
  const posts: BlogPost[];
  export default posts;
}
