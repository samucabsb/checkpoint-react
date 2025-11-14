import { Link } from "react-router-dom";

export default function FeaturedCard({ id, img, genre, title, rating }) {
  return (
    <Link
      to={`/game/${id}`}
      className="featured-card relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
    >
      <img
        src={img}
        className="featured-card-image w-full h-full object-cover transition-transform duration-300"
      />

      <div className="featured-card-overlay absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
        <span className="featured-card-genre inline-block bg-[rgba(255,215,0,0.25)] px-4 py-1 text-xs text-yellow-400 rounded-full mb-3">
          {genre}
        </span>

        <h3 className="featured-card-title text-[#FAF7EE] text-xl font-bold mb-1">
          {title}
        </h3>

        <div className="featured-card-rating flex items-center gap-2 text-yellow-400">
          <span className="tracking-wider">★★★★★</span>
          <span>{rating}</span>
        </div>
      </div>
    </Link>
  );
}
