package com.hrift.backend.controller;

import com.hrift.backend.entities.CandidateProfile;
import com.hrift.backend.service.CVParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/cv")
public class CVParserController {

    @Autowired
    private CVParserService parserService;

    @PostMapping("/parse")
    public ResponseEntity<CandidateProfile> parseCV(@RequestParam("file") MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("cv_", ".pdf");
        file.transferTo(tempFile);

        CandidateProfile profile = parserService.parseCV(tempFile);

        return ResponseEntity.ok(profile);
    }
}
