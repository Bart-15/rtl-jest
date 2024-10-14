import { cn } from '@/lib/utils';
import { CardData } from '@/types/card.types';
import { createContext, useContext } from 'react';

type CardProps = React.HTMLProps<HTMLDivElement> & {
  card: CardData;
  children: React.ReactNode;
};

type CardItemContextType = {
  card: CardData;
};

const CardItemContext = createContext<CardItemContextType | undefined>(
  undefined,
);

const useCardItemContext = () => {
  const context = useContext(CardItemContext);

  if (!context) {
    throw new Error(
      'CardItem components must be used within a CardItem provider',
    );
  }
  return context;
};

const Card = ({ card, children, ...rest }: CardProps) => {
  return (
    <CardItemContext.Provider value={{ card }}>
      <div {...rest}>{children}</div>
    </CardItemContext.Provider>
  );
};

Card.Title = function CardTitle(props: React.HTMLProps<HTMLHeadingElement>) {
  const { card } = useCardItemContext();
  return (
    <h4 className={cn('text-1xl mb-2', props.className)} {...props}>
      {card.title}
    </h4>
  );
};

Card.Count = function CardCount(props: React.HTMLProps<HTMLParagraphElement>) {
  const { card } = useCardItemContext();
  return (
    <p className={cn('mb-2 text-lg', props.className)} {...props}>
      {card.count}
    </p>
  );
};

Card.Subtext = function CardSubtext(
  props: React.HTMLProps<HTMLParagraphElement>,
) {
  const { card } = useCardItemContext();
  return (
    <p className={cn('mb-2 text-xs', props.className)} {...props}>
      {card.subtext}
    </p>
  );
};

Card.Icon = function CardIcon() {
  const { card } = useCardItemContext();
  return card.icon;
};

Card.displayName = 'Card';

export default Card;
