var app = angular.module('appointmentApp', []);

app.controller('AppointmentController', function($scope) {
    $scope.appointments = [];
    $scope.appointment = {};
    $scope.isEditing = false;
    $scope.editingIndex = -1;
    $scope.searchQuery = '';

    $scope.submitAppointment = function() {
        if ($scope.appointmentForm.$valid) {
            if ($scope.isEditing) {
                $scope.appointments[$scope.editingIndex] = angular.copy($scope.appointment);
                $scope.isEditing = false;
                $scope.editingIndex = -1;
            } else {
                $scope.appointments.push(angular.copy($scope.appointment));
            }
            $scope.resetForm();
        }
    };

    $scope.editAppointment = function(index) {
        $scope.appointment = angular.copy($scope.appointments[index]);
        $scope.isEditing = true;
        $scope.editingIndex = index;
    };

    $scope.deleteAppointment = function(index) {
        if (confirm('Are you sure you want to delete this appointment?')) {
            $scope.appointments.splice(index, 1);
        }
    };

    $scope.resetForm = function() {
        $scope.appointment = {};
        $scope.appointmentForm.$setPristine();
        $scope.appointmentForm.$setUntouched();
        $scope.isEditing = false;
        $scope.editingIndex = -1;
    };

    $scope.validateField = function(fieldName) {
        // Additional validation logic if needed
    };
});