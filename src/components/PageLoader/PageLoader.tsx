import "./PageLoader.css";

interface PageLoaderProps {
  fullPage?: boolean;
}

export default function PageLoader({ fullPage }: PageLoaderProps) {
  return (
    <>
      <div className="page-loader__bar" />
      {fullPage && (
        <div className="page-loader__overlay">
          <div className="page-loader__spinner" />
        </div>
      )}
    </>
  );
}
