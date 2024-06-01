import AvatarWithTextSkeleton from './AvatarsWithTextSkeleton'
import ArticleSkeleton from './ArticleSkeleton'

export default function ProfileSkeleton() {
  return (
    <>
      <AvatarWithTextSkeleton className="w-full md:col-span-2" />
      <ArticleSkeleton className="w-full" />
      <ArticleSkeleton className="w-full" />
    </>
  )
}
