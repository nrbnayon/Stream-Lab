import { Button } from "@/components/ui/button";

export default function AnalyzedScripts({ scripts = [] }) {
  return scripts.length ? (
    <div className="my-5 flex flex-col gap-3">
      {scripts.map((script, index) => {
        const summaryText =
          script?.analysis_text ??
          script?.summary ??
          script?.metadata?.raw?.analysis_text ??
          "";

        const downloadUrl =
          script?.download_url ||
          script?.output_url ||
          script?.file_url ||
          script?.metadata?.raw?.output_url ||
          null;

        return (
          <div key={script?.id ?? index}>
            <p className="text-sm font-medium">
              {script?.prompt || script?.file_name || `Script ${index + 1}`}
            </p>
            {summaryText ? (
              <p className="text-secondary-foreground text-sm mt-1 whitespace-pre-line">
                {summaryText}
              </p>
            ) : null}
            {downloadUrl ? (
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 w-fit"
                asChild
              >
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  Download Notes
                </a>
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt analyzed any script yet
    </p>
  );
}
