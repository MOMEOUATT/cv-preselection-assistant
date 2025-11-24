package com.hrift.backend.service;

import com.hrift.backend.entities.CandidateProfile;
import com.hrift.backend.entities.Experience;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CVParserService {

    // Surcharge pratique si tu pars d’un BLOB
    public CandidateProfile parseCV(byte[] pdfBytes) throws IOException {
        File tmp = File.createTempFile("cv_", ".pdf");
        try (FileOutputStream fos = new FileOutputStream(tmp)) {
            fos.write(pdfBytes);
        }
        try {
            return parseCV(tmp);
        } finally {
            // Nettoyage
            if (!tmp.delete()) tmp.deleteOnExit();
        }
    }

    public CandidateProfile parseCV(File file) throws IOException {
        CandidateProfile profile = new CandidateProfile();

        // Texte “global” pour email/phone/langues/skills
        String text = extractTextFromPDF(file);
        // Lignes conservant la structure pour l’éducation/expériences et le nom
        String[] lines = extractLinesFromPDF(file);

        System.out.println("text extrait:\n" + text);
        System.out.println("lignes:\n" + Arrays.toString(lines));

        profile.setName(extractName(lines));
        profile.setEmail(extractEmail(text));
        profile.setPhone(extractPhone(text));
        profile.setSkills(extractSkills(text));
        profile.setEducation(extractEducation(lines));
        profile.setExperiences(extractExperiences(lines));
        profile.setLanguages(extractLanguages(lines));
        profile.setDomain(determineDomain(profile.getSkills()));

        return profile;
    }

    // -------------------------- Lecture PDF --------------------------

    private String extractTextFromPDF(File file) throws IOException {
        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            // Conserver espaces pour faciliter les regex globales, mais retirer \r
            return stripper.getText(document).replace("\r", " ");
        }
    }

    private String[] extractLinesFromPDF(File file) throws IOException {
        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String raw = stripper.getText(document);
            // Nettoyage des caractères parasites sur les lignes
            return Arrays.stream(raw.split("\\R+"))
                    .map(s -> s.replaceAll("\\u0000", "").trim())
                    .toArray(String[]::new);
        }
    }

    // -------------------------- Nom --------------------------

    // Cherche le nom à la fin du document (souvent signature) et filtre les faux positifs
    private String extractName(String[] lines) {
        for (int i = lines.length - 1; i >= 0; i--) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;
            // Un nom: au moins deux mots démarrant par majuscules (accents supportés)
            if (line.matches("^[A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+\\s+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+(?:\\s+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+)*$")) {
                // Exclure titres/sections
                String low = line.toLowerCase(Locale.ROOT);
                if (!low.contains("maroc") && !low.contains("ingénieur") && !low.contains("faculté")
                        && !low.contains("formation") && !low.contains("expérience")
                        && !low.contains("projet") && !low.contains("langue")
                        && !low.contains("atout") && !low.contains("diplôme")) {
                    return line;
                }
            }
        }
        // Fallback: recherche globale stricte en filtrant
        Pattern namePattern = Pattern.compile("([A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+\\s+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+(?:\\s+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ\\-']+)*)");
        List<String> exclusions = Arrays.asList("maroc", "ingénieur", "faculté", "formation", "expérience", "projet", "langue", "atout", "diplôme");
        for (String line : lines) {
            Matcher m = namePattern.matcher(line);
            while (m.find()) {
                String candidate = m.group(1).trim();
                String low = candidate.toLowerCase(Locale.ROOT);
                if (exclusions.stream().noneMatch(low::contains) && candidate.length() <= 64) {
                    return candidate;
                }
            }
        }
        return null;
    }

    // -------------------------- Contact --------------------------

    private String extractEmail(String text) {
        String compact = text.replaceAll("\\s+", "");
        Pattern emailPattern = Pattern.compile("[\\w._%+-]+@[\\w.-]+\\.[A-Za-z]{2,}");
        Matcher matcher = emailPattern.matcher(compact);
        return matcher.find() ? matcher.group() : null;
    }

    // Formats marocains avec tolérance d’espaces
    private String extractPhone(String text) {
        String normalized = text.replaceAll("[^+0-9 ]", " ").replaceAll("\\s+", " ").trim();
        Pattern phonePattern = Pattern.compile("(\\+?212|0)\\s?\\d{2,3}\\s?\\d{2}\\s?\\d{2}\\s?\\d{2,3}");
        Matcher matcher = phonePattern.matcher(normalized);
        return matcher.find() ? matcher.group().trim() : null;
    }

    // -------------------------- Skills & Domain --------------------------

    private List<String> extractSkills(String text) {
        List<String> knownSkills = Arrays.asList(
                // Backend
                "Java", "Spring Boot", "Spring", "Hibernate", "C#", ".NET", "Node.js", "Express", "PHP", "Laravel",
                "Python", "Django", "Flask", "Ruby", "Ruby on Rails", "Go", "Rust",
                // Frontend
                "HTML", "CSS", "JavaScript", "TypeScript", "Angular", "React", "Vue.js", "Bootstrap", "TailwindCSS", "jQuery",
                // Mobile
                "Kotlin", "Java (Android)", "Swift", "iOS", "Flutter", "Dart", "React Native", "Xamarin",
                // DB
                "MySQL", "PostgreSQL", "Oracle", "SQL Server", "SQLite", "MongoDB", "Redis", "Cassandra", "Elasticsearch",
                // DevOps/Cloud
                "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Terraform", "Ansible", "CI/CD", "Jenkins", "GitLab CI",
                "Prometheus", "Grafana", "NGINX", "Apache",
                // Data/AI
                "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "OpenCV",
                "NLTK", "Spacy", "R", "SAS", "MATLAB", "Julia",
                // Sec
                "Pentesting", "OWASP", "Metasploit", "Nmap", "Wireshark", "Burp Suite", "Kali Linux", "Cryptographie",
                "Sécurité Réseau", "SOC", "SIEM", "ISO 27001",
                // Gestion/Outils
                "Agile", "Scrum", "Kanban", "Jira", "Trello", "Confluence", "Asana", "Notion",
                "MS Project", "Prince2", "PMP",
                // VCS
                "Git", "GitHub", "GitLab", "Bitbucket",
                // Bureautique
                "Excel", "Word", "PowerPoint", "Outlook", "Google Workspace", "SharePoint",
                // Design
                "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", "Canva",
                // Big Data
                "Hadoop", "Spark", "Hive", "Kafka", "Airflow",
                // QA
                "JUnit", "Selenium", "Cypress", "Postman", "TestNG", "Cucumber", "Mockito",
                // Autres
                "Linux", "Bash", "Shell Scripting", "Powershell", "REST API", "GraphQL", "SOAP", "Microservices",
                "NoSQL", "ETL", "Data Warehouse", "C++", "C"
        );

        List<String> found = new ArrayList<>();
        for (String skill : knownSkills) {
            Pattern p = Pattern.compile("\\b" + Pattern.quote(skill) + "\\b", Pattern.CASE_INSENSITIVE);
            if (p.matcher(text).find()) found.add(skill);
        }
        // Dédupliquer en conservant l’ordre
        return new ArrayList<>(new LinkedHashSet<>(found));
    }

    private String determineDomain(List<String> skills) {
        if (skills == null || skills.isEmpty()) return "Informatique générale";
        boolean fullstack = skills.stream().anyMatch(s ->
                s.equalsIgnoreCase("Spring Boot") || s.equalsIgnoreCase("Angular")
                        || s.equalsIgnoreCase("React") || s.equalsIgnoreCase("Vue.js"));
        boolean data = skills.stream().anyMatch(s ->
                s.equalsIgnoreCase("Python") || s.equalsIgnoreCase("MATLAB")
                        || s.equalsIgnoreCase("Pandas") || s.equalsIgnoreCase("NumPy"));

        if (fullstack) return "Développement Fullstack";
        if (data) return "Développement & Data Science";
        return "Informatique générale";
    }

    // -------------------------- Education --------------------------

    // Regroupe les lignes d’un même diplôme jusqu’à la prochaine section
    private List<String> extractEducation(String[] lines) {
        List<String> education = new ArrayList<>();
        for (String line : lines) {
            if (line.toLowerCase().contains("master") ||
                    line.toLowerCase().contains("licence") ||
                    line.toLowerCase().contains("ingénieur") ||
                    line.toLowerCase().contains("baccalauréat") ||
                    line.toLowerCase().contains("baccalaureat") ||
                    line.toLowerCase().contains("classes préparatoires") ||
                    line.toLowerCase().contains("classe préparatoire")){
                education.add(line.trim());
            }
        }
        return education;
    }

    // -------------------------- Expériences --------------------------

    // Fusionne les lignes d’un même bloc expérience/stage/projet, extrait dates
    // Recherche de l’indice d’une section par titre
//    private int findSectionLine(String[] lines, String title) {
//        for (int i = 0; i < lines.length; i++) {
//            if (lines[i].toLowerCase().contains(title.toLowerCase())) {
//                return i;
//            }
//        }
//        return -1;
//    }

    private List<Experience> extractExperiences(String[] lines) {
        List<Experience> all = new ArrayList<>();
        // 1) segmenter en deux passages : prof + académique
        all.addAll(parseSegment(lines,
                "Expériences professionnelles",
                "Projets Académiques"));
        all.addAll(parseSegment(lines,
                "Projets Académiques",
                "Langues"));
        return all;
    }

    private List<Experience> parseSegment(String[] lines, String startTitle, String endTitle) {
        int from = findSection(lines, startTitle) + 1;
        int to   = findSection(lines, endTitle);
        if (from <= 0) return Collections.emptyList();
        if (to < 0 || to <= from) to = lines.length;

        // 2) headerPat : optional “Depuis”, date1 (Mois. YYYY | YYYY),
        //    optional separator + date2, reste du texte
        String months = "(?i)(?:janv?\\.|févr?\\.|mars|avr?\\.|mai|juin|juil?\\.|août|sept?\\.|oct\\.|nov\\.|déc\\.)";
        String yearRx = "\\d{4}";
        Pattern headerPat = Pattern.compile(
                "^(?:depuis\\s*)?"                    // opt. “Depuis ”
                        + "(?<date1>" + months + "|" + yearRx + ")"      //  startDate
                        + "(?:[-–à\\s]+(?<date2>" + months + "|" + yearRx + "))?" // opt. endDate
                        + "\\s*(?<rest>.*)$"                          // reste
        );

        List<Experience> exps = new ArrayList<>();
        Experience    curr = null;
        StringBuilder buf  = new StringBuilder();

        for (int i = from; i < to; i++) {
            String raw = lines[i].replaceAll("\\u0000","").trim();
            if (raw.isEmpty()) continue;

            Matcher m = headerPat.matcher(raw);
            if (m.matches()) {
                // a) finaliser le bloc courant
                if (curr != null) {
                    curr.setDescription(buf.toString().trim());
                    exps.add(curr);
                }
                // b) démarrer un nouveau bloc
                curr = new Experience();
                buf.setLength(0);

                // c) affecter startDate / endDate
                curr.setStartDate(m.group("date1"));
                curr.setEndDate(m.group("date2"));

                // d) le reste (sans les dates) comme début de description
                String rest = m.group("rest").trim();
                if (!rest.isEmpty()) buf.append(rest).append(" ");
            }
            else if (curr != null) {
                // suite du même bloc → concaténer
                buf.append(raw).append(" ");
            }
        }

        // 3) finaliser le dernier bloc
        if (curr != null) {
            curr.setDescription(buf.toString().trim());
            exps.add(curr);
        }

        // 4) filtrer vides et retourner
        exps.removeIf(e -> e.getDescription() == null || e.getDescription().isBlank());
        return exps;
    }

    private int findSection(String[] lines, String title) {
        for (int i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase(Locale.ROOT)
                    .contains(title.toLowerCase(Locale.ROOT))) {
                return i;
            }
        }
        return -1;
    }
//    private void finalizeExperience(List<Experience> list, StringBuilder desc, Experience exp) {
//        if (exp == null) return;
//        String description = postProcessBlock(desc);
//        exp.setDescription(description);
//        list.add(exp);
//    }

    // -------------------------- Langues --------------------------

    private Map<String, String> extractLanguages(String[] lines) {
        Map<String, String> languages = new HashMap<>();
        Pattern langPattern = Pattern.compile("(Français|Anglais|Espagnol|Allemand|Arabe)\\s*(\\(.*\\))?");
        for (String line : lines) {
            Matcher matcher = langPattern.matcher(line);
            if (matcher.find()) {
                String lang = matcher.group(1);
                String level = matcher.group(2) != null ? matcher.group(2).replace("(", "").replace(")", "") : "Niveau non précisé";
                languages.put(lang, level);
            }
        }
        return languages;
    }

    // -------------------------- Helpers --------------------------

    private String postProcessBlock(CharSequence sb) {
        return sb.toString()
                .replaceAll("\\s+", " ")
                .replace("  ", " ")
                .trim();
    }

//    private String firstMatch(String line, Pattern pattern) {
//        Matcher m = pattern.matcher(line);
//        return m.find() ? m.group() : null;
//    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase(Locale.ROOT);
    }
}