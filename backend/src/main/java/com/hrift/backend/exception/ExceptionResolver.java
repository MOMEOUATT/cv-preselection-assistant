package com.hrift.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@ControllerAdvice
public class ExceptionResolver extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception) {

        return switch (exception) {
            case BadCredentialsException e -> createProblemDetail(401, e.getMessage(), "L'email ou le mot de passe est incorrect");
            case AccountStatusException e -> createProblemDetail(403, e.getMessage(), "Le compte est blocké");
            case AccessDeniedException e -> createProblemDetail(403, e.getMessage(), "Vous n'êtes pas authorisé(e) à accéder à cette ressource");
            case SignatureException e -> createProblemDetail(403, e.getMessage(), "La signature JWT est invalide");
            case ExpiredJwtException e -> createProblemDetail(403, e.getMessage(), "Le token JWT a expiré");
            default -> createProblemDetail(500, exception.getMessage(), "Erreur du serveur interne.");
        };
    }

    private ProblemDetail createProblemDetail(int status, String message, String description) {
        ProblemDetail detail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(status), message);
        detail.setProperty("description", description);
        return detail;
    }
}
