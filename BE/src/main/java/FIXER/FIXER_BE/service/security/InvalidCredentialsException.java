// Custom exception class for invalid credentials
package FIXER.FIXER_BE.service.security;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}