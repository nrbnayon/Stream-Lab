export default function AnalyzedScripts({ scripts = [] }) {
  return scripts.length ? (
    <div className="my-5">AnalyzedScripts</div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt analyzed any script yet
    </p>
  );
}
