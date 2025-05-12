import { Metadata } from "next";

type MetadataOptions = {
  icon?: string;
};

export function generatePageMetadata(
  title: string,
  description: string,
  options: MetadataOptions = {}
): Metadata {
  return {
    title: title ? `${title} | aiqfome` : "aiqfome",
    description: description || "Peça comida pelo aiqfome",
    icons: {
      icon: options.icon || "/logo.svg",
    },
  };
}

export function generateNotFoundMetadata(
  resourceType: string = "Recurso"
): Metadata {
  return generatePageMetadata(
    `${resourceType} não encontrado`,
    `O ${resourceType.toLowerCase()} solicitado não foi encontrado.`
  );
}
