import dynamic from 'next/dynamic';

const OrderCustomizer = dynamic(
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  () => import('@/app/customize/components/OrderCustomizer'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <div>
      <OrderCustomizer />
    </div>
  );
}
