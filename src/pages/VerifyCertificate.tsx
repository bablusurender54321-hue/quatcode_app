import { useState } from "react";
import certificatesData from "../data/certificates.json";

/**
 * VerifyCertificate
 * -----------------
 * Public certificate verification page for QuantSigmaode.
 * Looks up a certificate ID against the static certificates.json
 * data file and shows whether it's valid, and if so, who it was
 * issued to and for what.
 *
 * Data source: src/data/certificates.json (adjust import path above
 * to match wherever you place the file in your repo).
 *
 * To add new certificates: append an entry to certificates.json
 * and redeploy. No backend required.
 */

type CertificateRecord = {
  id: string;
  name: string;
  course: string;
  issueDate: string;
  status: "valid" | "revoked";
};

type LookupState =
  | { phase: "idle" }
  | { phase: "found"; record: CertificateRecord }
  | { phase: "not_found" };

const certificates: CertificateRecord[] = (certificatesData as { certificates: CertificateRecord[] }).certificates;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function normalizeId(raw: string): string {
  return raw.trim().toUpperCase();
}

export default function VerifyCertificate() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<LookupState>({ phase: "idle" });

  // Support deep-linking via ?id=QC-2026-0001 (used by the QR code on certificates)
  useState(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam) {
      setQuery(idParam);
      runLookup(idParam);
    }
  });

  function runLookup(raw: string) {
    const id = normalizeId(raw);
    if (!id) {
      setResult({ phase: "idle" });
      return;
    }
    const match = certificates.find((c) => normalizeId(c.id) === id);
    if (match) {
      setResult({ phase: "found", record: match });
    } else {
      setResult({ phase: "not_found" });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runLookup(query);
  }

  return (
    <div className="verify-page">
      <div className="verify-card">
        <div className="verify-header">
          <div className="verify-brand">QUANT&Sigma;ODE</div>
          <h1>Certificate Verification</h1>
          <p className="verify-sub">
            Enter the certificate ID printed on the document to confirm it was issued by Quant&Sigma;ode, NIT Jaipur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. QC-2026-MNIT-0001"
            aria-label="Certificate ID"
            spellCheck={false}
          />
          <button type="submit">Verify</button>
        </form>

        {result.phase === "found" && (
          <div className="result result-valid" role="status">
            <div className="result-icon">&#10003;</div>
            <div className="result-title">Certificate Valid</div>
            <dl className="result-details">
              <dt>Issued to</dt>
              <dd>{result.record.name}</dd>
              <dt>Course</dt>
              <dd>{result.record.course}</dd>
              <dt>Date of issue</dt>
              <dd>{formatDate(result.record.issueDate)}</dd>
              <dt>Certificate ID</dt>
              <dd className="mono">{result.record.id}</dd>
            </dl>
          </div>
        )}

        {result.phase === "not_found" && (
          <div className="result result-invalid" role="status">
            <div className="result-icon">&#10007;</div>
            <div className="result-title">No matching certificate</div>
            <p className="result-message">
              We couldn't find a certificate with that ID. Double-check the ID printed on the document and try again.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .verify-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f7f8fa;
        }

        .verify-card {
          width: 100%;
          max-width: 480px;
          background: #ffffff;
          border: 1px solid #e3e6eb;
          border-radius: 12px;
          padding: 40px 36px;
          box-shadow: 0 1px 3px rgba(10, 31, 68, 0.06);
        }

        .verify-brand {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #c9a227;
          margin-bottom: 12px;
        }

        .verify-header h1 {
          font-size: 22px;
          font-weight: 700;
          color: #0a1f44;
          margin: 0 0 10px 0;
        }

        .verify-sub {
          font-size: 14px;
          line-height: 1.5;
          color: #5b6472;
          margin: 0 0 28px 0;
        }

        .verify-form {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }

        .verify-form input {
          flex: 1;
          padding: 11px 14px;
          font-size: 14px;
          border: 1px solid #d4d8de;
          border-radius: 8px;
          color: #0a1f44;
          font-family: inherit;
        }

        .verify-form input:focus {
          outline: none;
          border-color: #0a1f44;
          box-shadow: 0 0 0 3px rgba(10, 31, 68, 0.08);
        }

        .verify-form button {
          padding: 11px 20px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background: #0a1f44;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .verify-form button:hover {
          background: #142b58;
        }

        .verify-form button:focus-visible,
        .verify-form input:focus-visible {
          outline: 2px solid #c9a227;
          outline-offset: 2px;
        }

        .result {
          margin-top: 24px;
          padding: 20px;
          border-radius: 10px;
        }

        .result-valid {
          background: #f0f9f1;
          border: 1px solid #bfe3c4;
        }

        .result-invalid {
          background: #fdf2f2;
          border: 1px solid #f3c6c6;
        }

        .result-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .result-valid .result-icon {
          background: #1f8a3a;
          color: #ffffff;
        }

        .result-invalid .result-icon {
          background: #c23b3b;
          color: #ffffff;
        }

        .result-title {
          font-size: 15px;
          font-weight: 700;
          color: #0a1f44;
          margin-bottom: 14px;
        }

        .result-message {
          font-size: 13.5px;
          line-height: 1.5;
          color: #5b6472;
          margin: 0;
        }

        .result-details {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 6px 16px;
          margin: 0;
        }

        .result-details dt {
          font-size: 12px;
          color: #5b6472;
          font-weight: 600;
        }

        .result-details dd {
          font-size: 13.5px;
          color: #0a1f44;
          margin: 0;
          font-weight: 500;
        }

        .result-details dd.mono {
          font-family: 'Courier New', monospace;
          letter-spacing: 0.5px;
        }

        @media (max-width: 480px) {
          .verify-card {
            padding: 28px 22px;
          }
          .verify-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
