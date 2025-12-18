import ErrorFallback from "@/components/ErrorFallback";

export default function NotFound() {
  return (
    <ErrorFallback
      title="Oops! Page Not Found"
      heading="We Are Sorry, But The Page You Requested Was Not Found"
      showSubscribe
    />
  );
}
