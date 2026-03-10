from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.author
    
class IsParticipantSession(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not obj.is_private:
            return True
        return request.user.is_authenticated and obj.participants.filter(user=request.user).exists()