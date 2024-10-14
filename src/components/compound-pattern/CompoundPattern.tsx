import { cardData } from '@/data/card.data';
import Card from '../card/Card';
const CompoundPattern = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-row flex-wrap justify-center gap-3">
        {cardData.map((card) => (
          <Card
            card={card}
            key={card.title}
            className="w-[300px] rounded-sm border-2 border-blue-400 bg-slate-100 px-4 py-5 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-1">
                <Card.Title />
                <Card.Count />
                <Card.Subtext />
              </div>
              <div className="px-5">
                <Card.Icon />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompoundPattern;
