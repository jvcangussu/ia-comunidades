import CommunityCard from "./CommunityCard";

function CommunityList({ communities }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          id={community.id}
          name={community.name}
          imageUrl={community.image}
          description={community.description}
        />
      ))}
    </div>
  );
}

export default CommunityList;