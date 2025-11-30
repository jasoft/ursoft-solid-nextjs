import { MDXRemote } from "next-mdx-remote/rsc";

export default function MdxContent({ mdx }: { mdx: string }) {
  return <MDXRemote source={mdx} />;
}
