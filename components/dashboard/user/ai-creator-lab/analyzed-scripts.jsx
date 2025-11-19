import { Button } from "@/components/ui/button";

export default function AnalyzedScripts({ scripts = [] }) {
  return scripts.length ? (
    <div className="my-5 flex flex-col gap-6">
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

        const fileName =
          script?.prompt || script?.file_name || `Script-${index + 1}`;

        return (
          <div
            key={script?.id ?? index}
            className="rounded-lg border bg-card p-5 shadow-sm"
          >
            <h4 className="font-semibold text-foreground">{fileName}</h4>

            {summaryText ? (
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {summaryText}
              </p>
            ) : null}

            {downloadUrl && (
              <Button variant="secondary" size="sm" className="mt-4" asChild>
                <a
                  href={downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Notes
                </a>
              </Button>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-center text-destructive my-8 text-lg">
      You haven&apos;t analyzed any script yet
    </p>
  );
}
