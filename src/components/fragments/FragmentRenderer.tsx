import React from "react";
import { getParsedHeaderFragment, getParsedFooterFragment } from "@/lib/fragments";
import FragmentHeader from "./FragmentHeader";
import FragmentFooter from "./FragmentFooter";

interface ServerFragmentHeaderProps {
  fallback?: React.ReactNode;
}

interface ServerFragmentFooterProps {
  fallback?: React.ReactNode;
}

export function HeaderFragment({ fallback }: ServerFragmentHeaderProps) {
  try {
    const headerAst = getParsedHeaderFragment();
    return <FragmentHeader ast={headerAst} />;
  } catch (error) {
    console.error("Failed to render HeaderFragment:", error);
    return fallback ? <>{fallback}</> : null;
  }
}

export function FooterFragment({ fallback }: ServerFragmentFooterProps) {
  try {
    const footerAst = getParsedFooterFragment();
    return <FragmentFooter ast={footerAst} />;
  } catch (error) {
    console.error("Failed to render FooterFragment:", error);
    return fallback ? <>{fallback}</> : null;
  }
}

export { FragmentHeader, FragmentFooter };
