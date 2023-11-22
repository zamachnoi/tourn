interface AvatarProps {
    imageUrl: string
    size?: number
}

export default function Avatar(props: AvatarProps) {
    const { imageUrl, size = 12 } = props

    return (
        <div className="inline-block overflow-hidden rounded-full bg-gray-600">
            <img src={imageUrl} alt="Avatar" className="h-full w-12" />
        </div>
    )
}
