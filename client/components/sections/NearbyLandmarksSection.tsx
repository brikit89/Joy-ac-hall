export interface Landmark {
  title: string;
  description: string;
}

interface NearbyLandmarksSectionProps {
  landmarks: Landmark[];
  title?: string;
  sectionId?: string;
}

const NearbyLandmarksSection = ({
  landmarks,
  sectionId="landmark",
  title = "Stay Near Major Landmarks in Rameswaram",
}: NearbyLandmarksSectionProps) => {
  return (
    <section id={sectionId} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="flex flex-wrap justify-center gap-8">
          {landmarks.map((landmark, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all w-full md:w-[calc(50%-1rem)]"
            >
              <h3 className="text-xl font-bold text-primary mb-3">
                {landmark.title}
              </h3>

              <p className="text-gray-700">
                {landmark.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NearbyLandmarksSection;